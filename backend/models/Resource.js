const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a resource name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  type: {
    type: String,
    required: [true, 'Please specify resource type'],
    enum: {
      values: ['food-box', 'meal-site', 'soup-kitchen'],
      message: 'Type must be either food-box, meal-site, or soup-kitchen'
    }
  },
  address: {
    type: String,
    required: [true, 'Please add an address'],
    trim: true,
    maxlength: [200, 'Address cannot be more than 200 characters']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone cannot be more than 20 characters']
  },
  website: {
    type: String,
    trim: true,
    match: [
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
      'Please provide a valid URL'
    ]
  },
  coordinates: {
    latitude: {
      type: Number,
      required: [true, 'Please add latitude'],
      min: [-90, 'Latitude must be between -90 and 90'],
      max: [90, 'Latitude must be between -90 and 90']
    },
    longitude: {
      type: Number,
      required: [true, 'Please add longitude'],
      min: [-180, 'Longitude must be between -180 and 180'],
      max: [180, 'Longitude must be between -180 and 180']
    }
  },
  hours: {
    type: String,
    trim: true,
    maxlength: [200, 'Hours cannot be more than 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [300, 'Notes cannot be more than 300 characters']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedAt: {
    type: Date
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  images: [{
    url: String,
    alt: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  contactInfo: {
    emergencyContact: String,
    managerName: String,
    managerEmail: String
  },
  capacity: {
    current: Number,
    maximum: Number,
    lastUpdated: Date
  },
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
resourceSchema.index({ coordinates: '2dsphere' });
resourceSchema.index({ type: 1 });
resourceSchema.index({ isActive: 1 });
resourceSchema.index({ verified: 1 });
resourceSchema.index({ 'createdBy': 1 });
resourceSchema.index({ name: 'text', description: 'text', address: 'text' });

// Virtual for average rating calculation
resourceSchema.virtual('ratingCount').get(function() {
  return this.ratings.length;
});

// Pre-save middleware to update average rating
resourceSchema.pre('save', function(next) {
  if (this.ratings && this.ratings.length > 0) {
    const sum = this.ratings.reduce((acc, rating) => acc + rating.rating, 0);
    this.averageRating = sum / this.ratings.length;
  }
  next();
});

// Static method to find resources near a point
resourceSchema.statics.findNearby = function(longitude, latitude, maxDistance = 10000) {
  return this.find({
    coordinates: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude]
        },
        $maxDistance: maxDistance // in meters
      }
    },
    isActive: true
  });
};

// Instance method to add rating
resourceSchema.methods.addRating = function(userId, rating, comment) {
  // Remove existing rating from this user
  this.ratings = this.ratings.filter(r => r.user.toString() !== userId.toString());

  // Add new rating
  this.ratings.push({
    user: userId,
    rating: rating,
    comment: comment,
    createdAt: new Date()
  });

  return this.save();
};

module.exports = mongoose.model('Resource', resourceSchema);