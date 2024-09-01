class APIFilters{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }

    search(){
      
        const keyword = this.queryStr.get('keyword')
        ?
        {
            name:{
                $regex:this.queryStr.get('keyword'),
                $options:"i"
            },
        }:
        {}
        this.query = this.query.find({...keyword})
        return this;
    }
  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }

}

export default APIFilters;