/**
 *
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */

 define(['N/record'], 
    function (record) {

        function getWillCallAddress(customerId) {
            var customerRecord = record.load({
                type: 'customer',
                id: customerId
            });

            customerRecord.findSublistLineWithValue({
                sublistId: 'addressbook',
                fieldId: 'addr1',
                value: '2380 Railroad St.'
            });

            

        }

    function fieldChanged(context) {
        var currentRecord = context.currentRecord
        var fieldId = context.fieldId;
        var customerId = currentRecord.getValue('entity');

        if (fieldId != 'shipmethod' || currentRecord.getValue(fieldId) != 6) { return; }

        var willCallId = getWillCallAddress(customerId);

        currentRecord.setValue({
            fieldId: 'shipaddresslist',
            value: willCallId
        });
    }

    return {
        fieldChanged : fieldChanged
    }
 });