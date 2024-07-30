import config from '../config';
import request from 'supertest';
import devicesPage from '../pages/devicesPage';
import { getIdFromEditButton } from '../helpers/getIdHrefEditButton.js';
import { faker } from '@faker-js/faker';

fixture `Integration tests`
    .page `${config.ui.baseUrl}`;


test('Integration - Test 1 - Check the api device list elements are present on the page', async t => {
    const allDevices = await request(config.api.baseUrl)
            .get(config.api.endpoints.devices)
            .expect(200);
    
    for (const devices of allDevices.body) {
        await t.expect(devicesPage.deviceName.withText(devices.system_name).visible).ok(`The device ${devices.system_name} is not present on the page`)
         .expect(devicesPage.deviceType.withText(devices.type).visible).ok(`The device type ${devices.type} is not present on the page`)
         .expect(devicesPage.deviceCapacity.withText(devices.hdd_capacity).visible).ok(`The device capacity ${devices.hdd_capacity} is not present on the page`)
         .expect(devicesPage.getDynamicEditButton(devices.id).innerText, ).contains('EDIT',`The edit button id #${devices.id} is not present on the page`)
         .expect(devicesPage.getDynamicEditButton(devices.id).nextSibling(0).innerText).contains('REMOVE', `The remove button id #${devices.id} is not present on the page`)
    }   
});


test(`Integration - Test 3 - Rename the first element in the list to 'Renamed Device' via API`, async t => {
        const deviceName = 'Renamed Device'
        const randomHddCapacity = faker.number.int(100).toString()
        const firstEditButtonInList = devicesPage.deviceEditButton.nth(0)
        const deviceId = await getIdFromEditButton(firstEditButtonInList)
        const dataToUpdate = {"system_name": deviceName,"type": "MAC","hdd_capacity": randomHddCapacity}

        await request(config.api.baseUrl)
            .put(config.api.endpoints.devices + deviceId)
            .send(dataToUpdate)
            .expect(200)
        await t.eval(() => location.reload(true));
        await t
            .expect(devicesPage.deviceName.nth(0).withText(deviceName).visible).ok(`The first element ${deviceName} is not present on the page`)
     });


test('Integration - Test 4 - Deletes the last element in the devices list via API', async t => {
    const lastEditButtonInList = devicesPage.deviceEditButton.nth(-1)
    const deviceId = await getIdFromEditButton(lastEditButtonInList)

    await request(config.api.baseUrl)
            .delete(config.api.endpoints.devices + deviceId)
            .expect(200)
    await t.eval(() => location.reload(true))
    await t.expect(deviceId.visible).notOk(`The last element is present on the page`)
});



