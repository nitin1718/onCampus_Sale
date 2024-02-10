class APIFilters{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }

    search(){
        console.log(this.queryStr.get('keyword'))
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

}

export default APIFilters;