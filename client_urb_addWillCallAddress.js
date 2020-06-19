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
                id: customerId,
                isDynamic: true
            });

            var addressSublistLine = customerRecord.findSublistLineWithValue({
                sublistId: 'addressbook',
                fieldId: 'addr1',
                value: '2380 Railroad St.'
            });

            if (addressSublistLine == -1) {

                console.dir(customerRecord);

                customerRecord.selectNewLine({
                    sublistId: 'addressbook'
                });

                var willCallAddressSubrecord = customerRecord.getCurrentSublistSubrecord({
                    sublistId: 'addressbook',
                    fieldId: 'addressbookaddress',
                    isDynamic: true
                });

                willCallAddressSubrecord.setValue({
                    fieldId: 'label',
                    value: 'Railroad Will Call'
                });

                willCallAddressSubrecord.setValue({
                    fieldId: 'addr1',
                    value: '2380 Railroad St.'
                });

                willCallAddressSubrecord.setValue({
                    fieldId: 'addr2',
                    value: 'BLDG. 101'
                });

                willCallAddressSubrecord.setValue({
                    fieldId: 'city',
                    value: 'Corona'
                });

                willCallAddressSubrecord.setValue({
                    fieldId: 'state',
                    value: 'CA'
                });

                willCallAddressSubrecord.setValue({
                    fieldId: 'zip',
                    value: '92880'
                });

                customerRecord.commitLine({
                    sublistId: 'addressbook'
                });

                var willCallAddressLine = customerRecord.getLineCount({
                    sublistId: 'addressbook'
                }) - 1;

                willCallAddressId = customerRecord.getSublistValue({
                    sublistId: 'addressbook',
                    fieldId: 'addressbookaddress',
                    line: willCallAddressLine
                });

                customerRecord.save();

            }

            return willCallAddressId;
            

        }

    function fieldChanged(context) {
        var currentRecord = context.currentRecord
        var fieldId = context.fieldId;
        var customerId = currentRecord.getValue('entity');

        if (fieldId != 'shipmethod' || currentRecord.getValue(fieldId) != 6) { return; }

        var willCallAddressId = getWillCallAddressId(customerId);

        currentRecord.setValue({
            fieldId: 'shippingaddress',
            value: willCallAddressId
        });
    }

    return {
        fieldChanged : fieldChanged
    }
 });