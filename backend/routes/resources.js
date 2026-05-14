const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const Resource = require('../models/Resource');
const { protect, authorize, checkOwnership } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all resources
// @route   GET /api/resources
// @access  Public
router.get('/', [
  query('type').optional().isIn(['food-box', 'meal-site', 'soup-kitchen']),
  query('verified').optional().isBoolean(),
  query('active').optional().isBoolean(),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('page').optional().isInt({ min: 1 }),
  query('search').optional().isString().trim()
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      type,
      verified,
      active = true,
      limit = 50,
      page = 1,
      search,
      lat,
      lng,
      radius
    } = req.query;

    // Build query
    let query = { isActive: active === 'true' };

    if (type) query.type = type;
    if (verified !== undefined) query.verified = verified === 'true';

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // Geospatial search
    if (lat && lng && radius) {
      query.coordinates = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(radius) * 1000 // Convert km to meters
        }
      };
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Execute query
    const resources = await Resource.find(query)
      .populate('createdBy', 'name email')
      .populate('verifiedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    // Get total count for pagination
    const total = await Resource.countDocuments(query);

    res.json({
      success: true,
      count: resources.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      },
      data: resources
    });
  } catch (err) {
    console.error('Get resources error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error fetching resources'
    });
  }
});

// @desc    Get single resource
// @route   GET /api/resources/:id
// @access  Public
router.get('/:id', [
  param('id').isMongoId().withMessage('Invalid resource ID')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const resource = await Resource.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('verifiedBy', 'name email')
      .populate('ratings.user', 'name');

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    res.json({
      success: true,
      data: resource
    });
  } catch (err) {
    console.error('Get resource error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error fetching resource'
    });
  }
});

// @desc    Create new resource
// @route   POST /api/resources
// @access  Private
router.post('/', protect, [
  body('name').notEmpty().withMessage('Name is required').trim().isLength({ max: 100 }),
  body('type').isIn(['food-box', 'meal-site', 'soup-kitchen']).withMessage('Invalid resource type'),
  body('address').notEmpty().withMessage('Address is required').trim().isLength({ max: 200 }),
  body('phone').optional().trim().isLength({ max: 20 }),
  body('website').optional().isURL().withMessage('Invalid website URL'),
  body('coordinates.latitude').isFloat({ min: -90, max: 90 }).withMessage('Invalid latitude'),
  body('coordinates.longitude').isFloat({ min: -180, max: 180 }).withMessage('Invalid longitude'),
  body('hours').optional().trim().isLength({ max: 200 }),
  body('description').notEmpty().withMessage('Description is required').trim().isLength({ max: 500 }),
  body('notes').optional().trim().isLength({ max: 300 })
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Add user to req.body
    req.body.createdBy = req.user._id;

    // Create resource
    const resource = await Resource.create(req.body);

    // Populate created by field
    await resource.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Resource created successfully',
      data: resource
    });
  } catch (err) {
    console.error('Create resource error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error creating resource'
    });
  }
});

// @desc    Update resource
// @route   PUT /api/resources/:id
// @access  Private
router.put('/:id', protect, checkOwnership(Resource), [
  param('id').isMongoId().withMessage('Invalid resource ID'),
  body('name').optional().notEmpty().trim().isLength({ max: 100 }),
  body('type').optional().isIn(['food-box', 'meal-site', 'soup-kitchen']),
  body('address').optional().notEmpty().trim().isLength({ max: 200 }),
  body('phone').optional().trim().isLength({ max: 20 }),
  body('website').optional().isURL(),
  body('coordinates.latitude').optional().isFloat({ min: -90, max: 90 }),
  body('coordinates.longitude').optional().isFloat({ min: -180, max: 180 }),
  body('hours').optional().trim().isLength({ max: 200 }),
  body('description').optional().notEmpty().trim().isLength({ max: 500 }),
  body('notes').optional().trim().isLength({ max: 300 }),
  body('isActive').optional().isBoolean()
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Add updated by field
    req.body.updatedBy = req.user._id;

    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('createdBy', 'name email')
     .populate('updatedBy', 'name email');

    res.json({
      success: true,
      message: 'Resource updated successfully',
      data: resource
    });
  } catch (err) {
    console.error('Update resource error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error updating resource'
    });
  }
});

// @desc    Delete resource
// @route   DELETE /api/resources/:id
// @access  Private
router.delete('/:id', protect, checkOwnership(Resource), [
  param('id').isMongoId().withMessage('Invalid resource ID')
], async (req, res) => {
  try {
    await Resource.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Resource deleted successfully'
    });
  } catch (err) {
    console.error('Delete resource error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error deleting resource'
    });
  }
});

// @desc    Verify resource
// @route   PUT /api/resources/:id/verify
// @access  Private (Admin only)
router.put('/:id/verify', protect, authorize('admin'), [
  param('id').isMongoId().withMessage('Invalid resource ID'),
  body('verified').isBoolean().withMessage('Verified must be a boolean')
], async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    resource.verified = req.body.verified;
    if (req.body.verified) {
      resource.verifiedBy = req.user._id;
      resource.verifiedAt = new Date();
    } else {
      resource.verifiedBy = null;
      resource.verifiedAt = null;
    }

    await resource.save();
    await resource.populate('verifiedBy', 'name email');

    res.json({
      success: true,
      message: `Resource ${req.body.verified ? 'verified' : 'unverified'} successfully`,
      data: resource
    });
  } catch (err) {
    console.error('Verify resource error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error verifying resource'
    });
  }
});

// @desc    Add rating to resource
// @route   POST /api/resources/:id/rating
// @access  Private
router.post('/:id/rating', protect, [
  param('id').isMongoId().withMessage('Invalid resource ID'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().trim().isLength({ max: 300 })
], async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    await resource.addRating(req.user._id, req.body.rating, req.body.comment);
    await resource.populate('ratings.user', 'name');

    res.json({
      success: true,
      message: 'Rating added successfully',
      data: resource
    });
  } catch (err) {
    console.error('Add rating error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error adding rating'
    });
  }
});

module.exports = router;