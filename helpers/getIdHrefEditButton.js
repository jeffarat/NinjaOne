/**
 * Get the device's id from the last part of the href value
 * @param {Selector} editButton 
 * @returns {String} Returns device's id
 * @example href="/devices/edit/Jj5bn3G2H" returns Jj5bn3G2H
 */
export async function getIdFromEditButton(editButton){
    const hrefValue = await editButton.getAttribute('href')
    const id = hrefValue.split('/').pop();
    return id.toString()
}