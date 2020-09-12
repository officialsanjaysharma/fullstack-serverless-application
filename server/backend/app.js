/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

const axios = require("axios");
const { DATA_URL } = require("./config");
exports.lambdaHandler = async (event, context) => {
    try {
        let response;
        const resp = await axios(`${DATA_URL}`);    //Getting the data
        let result = [];
        if (event.pathParameters.category.toLowerCase() === "all") {
            result = resp;
        } else {
            result.data = await resp.data.filter(d => d.category_name.toLowerCase() === event.pathParameters.category.toLowerCase());
        }
        response = {
            'statusCode': 200,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            'body': JSON.stringify(result.data),
        }
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
};
