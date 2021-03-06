/**
 * Created by Femibams on 13/11/2018.
 * objective: building to scale
 */

class MongoDBHelper {
    constructor(mongoClient, model){
        this.mongoClient = mongoClient;
        this.model = model;
    }

    /**
     * Saves a task to the DB.
     *
     * @param data,
     * @returns {Promise}
     */
    save(data){
        return new Promise((resolve, reject) => {
            const saveSchema = this.model(data);
            saveSchema.save(function(err, result){
                if(err != null){
                    return reject(MongoDBHelper.handleError(error));
                }
                return resolve(result);
            });
        });
    }

    /**
     * Find a task
     * @param
     */
    find(searchObj){
        return new Promise((resolve, reject) => {
            const query = this.model.find(searchObj.conditions).sort({createdAt: 1});
            if (searchObj.fields) { 
                query.select(searchObj.fields); 
            }
            return query.exec((err, rec) => {
                if (err) {
                  return reject(MongoDBHelper.handleError(err));
                }
                return resolve(rec);
              });
        });
    }

    aggregate(params) {
        return new Promise((resolve, reject) => {
          const query = this.model.aggregate(params.conditions);
    
          return query.exec((err, modelData) => {
            if (err) {
              return reject(err);
            }
            return resolve(modelData);
          });
        });
    }

    delete(params) {
        return new Promise((resolve, reject) => {
            const query = this.model.deleteOne(params.conditions);
      
            return query.exec((err, modelData) => {
              if (err) {
                return reject(err);
              }
              return resolve(modelData);
            });
          });
    }
}

module.exports = MongoDBHelper;