/**
 * 
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */

 define(['N/record'],
    function (record) {

        function getWillCallAddressId(customerId) {
            var willCallAddressId;
            var customerRecord = record.load({
                type: 'customer',
                id: customerId
            });

            var addressSublistLine = customerRecord.findSublistLineWithValue({
                sublistId: 'addressbook',
                fieldId: 'addr1',
                value: '2380 Railroad St.'
            });

            if (addressSublistLine == -1) {
                willCallAddressId = record.create({
                   type: 'address',
                   defaultValues: {
                       entity: customerId,
                       addr1: '2380 Railroad St.',
                       addr2: 'BLDG 101',
                       city: 'Corona',
                       state: 'California',
                       zip :'92880'
                   }
                }).save();
            }

            return willCallAddressId;
            

        }

    function fieldChanged(context) {
        var currentRecord = context.currentRecord
        var fieldId = context.fieldId;
        var customerId = currentRecord.getValue('entity');

        if (fieldId != 'shipmethod' || currentRecord.getValue(fieldId) != 6) { return; }

        var willCallAddressId = getWillCallAddressid(customerId);

        currentRecord.setValue({
            fieldId: 'shipaddresslist',
            value: willCallAddressId
        });
    }

    return {
        fieldChanged : fieldChanged
    }
 });