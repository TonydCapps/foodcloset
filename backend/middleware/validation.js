// Input sanitization and validation middleware
const { body, param, query, validationResult } = require('express-validator');

const resourceValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),
  
  body('type')
    .notEmpty().withMessage('Type is required')
    .isIn(['food-box', 'meal-site', 'soup-kitchen'])
    .withMessage('Invalid resource type'),
  
  body('address')
    .trim()
    .notEmpty().withMessage('Address is required')
    .isLength({ max: 200 }).withMessage('Address cannot exceed 200 characters'),
  
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 10, max: 500 }).withMessage('Description must be between 10 and 500 characters'),
  
  body('coordinates.latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),
  
  body('coordinates.longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180'),
  
  body('phone')
    .optional()
    .trim()
    .isLength({ max: 20 }).withMessage('Phone cannot exceed 20 characters')
    .matches(/^[\d\-\+\(\)\s]*$/).withMessage('Invalid phone format'),
  
  body('website')
    .optional()
    .trim()
    .isURL().withMessage('Invalid website URL'),
  
  body('hours')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('Hours cannot exceed 200 characters'),
  
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 300 }).withMessage('Notes cannot exceed 300 characters')
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

module.exports = {
  resourceValidation,
  handleValidationErrors,
  validationResult
};