class APIFeatures {
    constructor(query, queryStr) {
      (this.query = query), (this.queryStr = queryStr);
    }
    filter() {
      const queryObj = { ...this.queryStr };
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach((el) => delete queryObj[el]);
  
      let queryStr = JSON.stringify(queryObj);
  
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
      console.log(JSON.parse(queryStr));
      this.query = this.query.find(JSON.parse(queryStr)); // no await here because find method returns a query object and query objects are not promises themselves . Mongoose gives query the ability to be consumed like a promise for easier dev .
      return this;
    }
    sort() {
      if (this.queryStr.sort) {
        const sortBy = this.queryStr.sort.split(',').join(' ');
        console.log(sortBy);
        this.query = this.query.sort(sortBy);
  
        //sort('price ratingsAverage)
      } else {
        this.query = this.query.sort('-createdAt');
      }
      return this;
    }
    limitFields() {
      if (this.queryStr.fields) {
        const fields = this.queryStr.fields.split(',').join(' ');
        this.query = this.query.select(fields);
      } else {
        this.query = this.query.select('-__v');
      }
      return this;
    }
    pagination() {
      const page = this.queryStr.page * 1 || 1;
      const limit = this.queryStr.limit * 1 || 100;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
      return this;
    }
  }

  module.exports = APIFeatures