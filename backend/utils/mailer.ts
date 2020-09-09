import * as AWS from "aws-sdk";
import Logger from "./logger";
import { getVerifyToken } from "./passport";

AWS.config.update({ region: "eu-central-1" });

const htmlSendTokenTemplate = (token: string) => `
    <div style="width: 100%; margin: auto;">
        <div style="display: table; width: 100%; height: 200px; margin: 0; background-color: skyblue; color: white; text-align: center; text-decoration: none;">
            <span style="display: table-cell; vertical-align: middle;">
                <h1>KAMI SUSHI TEST</h1>
            </span>
        </div>
        <div style="padding: 50px; text-align: center; font-size: 20px">
            <span>${token}</span>
        </div>
        <div style="display: table; width: 100%; height: 75px; margin: 0; background-color: #353535; color: lightgray; text-align: center; text-decoration: none;">
            <span style="display: table-cell; vertical-align: middle;">
                <h4>KAMI SUSHI TEST</h4>
            </span>
        </div>
    <div>
`;

export const sendToken = async (username: string) => {
    try {
        const token = await getVerifyToken(username);
        await new AWS.SES({ apiVersion: "2010-12-01" }).sendEmail({
            Destination: { ToAddresses: [process.env.VERIFY_EMAIL] },
            Message: {
                Body: {
                    Html: { Charset: "UTF-8", Data: htmlSendTokenTemplate(token) },
                    Text: { Charset: "UTF-8", Data: token }
                },
                Subject: { Charset: "UTF-8", Data: "KAMI Sushi admin login verification" }
            },
            Source: "contact@neisuo.ga"
        }).promise();
    } catch (err) {
        Logger.error(err.message);
        throw "Failed to send verification token";
    }
};