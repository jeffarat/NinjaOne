import config from '../config';
import devicesPage from '../pages/devicesPage';
import newDevicePage from '../pages/newDevicePage';
import { faker } from '@faker-js/faker';

const dataSet = require('../data/newDeviceData.json');

fixture `Regresion tests`
    .page `${config.ui.baseUrl}`;

dataSet.forEach(data => {
    test(`Regression - Test 2 - Add a ${data.systemName}  device to the list`, async t => {
        const randomDevicemName = 'Test2Device'+faker.commerce.product()
        const randomHddCapacity = faker.number.int(1000).toString()

        await t
            .click(devicesPage.addDevice)
            .typeText(newDevicePage.systemName, randomDevicemName)
            .typeText(newDevicePage.hddCapacity, randomHddCapacity)
            .click(newDevicePage.typeDeviceSelect)
            .click(newDevicePage.typeDeviceSelectOption.withText(data.systemName))
            .expect(newDevicePage.typeDeviceSelect.value).contains(data.selectValue);


        await t.
            click(newDevicePage.saveButton)
            .expect(devicesPage.deviceName.withText(randomDevicemName).visible).ok(`The device named ${randomDevicemName} is not present on the page`)
            .expect((devicesPage.deviceName.withText(randomDevicemName).nextSibling().withText(data.selectValue)).visible).ok(`The device type ${data.selectValue} is not present on the page`)
            .expect((devicesPage.deviceName.withText(randomDevicemName).nextSibling().withText(randomHddCapacity)).visible).ok(`The device capacity ${randomHddCapacity} is not present on the page`)
    });  
});




