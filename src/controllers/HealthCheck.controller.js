import { apiResponse } from "../utils/apiResponse.js";
import { asyncHnadler } from "../utils/asyncHandler.js";

const healthcheck = asyncHnadler(async (req, res) => {
    return res
    .status(200)
    .json(new apiResponse(200, "OK", "Health check passed"))
})

export {healthcheck}