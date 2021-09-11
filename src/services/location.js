const Locations = require("../models/scales").Location;
const sequelize = require("sequelize");
const response = require("../utils/response");

class LocationService {

  async create(locationObj,accountId) {
    // Check for deleted? and if deleted set not deleted?
 
    await Locations.create({
       location: locationObj["location"],
       account_id: accountId,
    });

    const resData = {
      success: true,
    };
    
    return response.handleSuccessResponseWithData("Location Added", resData);
  };
  
  async list(accountId) {
    console.log(accountId);
    console.log(Locations);
    const locations = await Locations.findAll({
      where: {
        account_id: accountId,
        is_deleted: 0,
      },
      attributes: [
        "location",
      ],
      raw: true,
    });
    return response.handleSuccessResponseWithData("Location List", locations);
  };

  async delete(location,accountId) {
    await Locations.update(
        {
            is_deleted: 1,
            updated_at: sequelize.literal("CURRENT_TIMESTAMP")
        },
        {
        where: {
            location: location,
            account_id: accountId,
            is_deleted: 0,
        },
    }
    );
    return response.handleSuccessResponse("Location deleted");
  };

}
module.exports = new LocationService();
