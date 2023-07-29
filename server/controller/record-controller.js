import Record from "../model/record.js";


export const saveRecord = async (request, response) => {
    try {
        const newRecord = await new Record(request.body);
        await newRecord.save();

        return response.status(200).json("new record save successfully");
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}


export const getRecords = async (request, response) => {
    try {
        const records = await Record.find({account : request.params.account})
        return response.status(200).json(records);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}