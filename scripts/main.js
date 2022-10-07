import { getSetting, registerSetting } from './utils/foundry.js'

Hooks.on('init', () => {
    registerSetting({
        name: 'create',
        config: true,
        type: Boolean,
        default: true,
        onChange: setCreateHook,
    })

    registerSetting({
        name: 'update',
        config: true,
        type: Boolean,
        default: true,
        onChange: setUpdateHook,
    })
})

Hooks.on('ready', () => {
    setCreateHook(getSetting('create'))
    setUpdateHook(getSetting('update'))
})

/** @param {boolean} value */
function setCreateHook(value) {
    if (value) Hooks.on('preCreateItem', onPreCreateItem)
    else Hooks.off('preCreateItem', onPreCreateItem)
}

/** @param {boolean} value */
function setUpdateHook(value) {
    if (value) Hooks.on('preUpdateItem', onPreUpdateItem)
    else Hooks.off('preUpdateItem', onPreUpdateItem)
}

/** @param {Item} item */
function onPreCreateItem(item) {
    const img = item.img
    if (!img || !item.system.identification) return
    item._source.system.identification.unidentified.img = img
}

/**
 * @param {Item} item
 * @param {Record<string, any>} changes
 */
function onPreUpdateItem(item, changes) {
    if (!item.system.identification || !changes.img) return
    setProperty(changes, 'system.identification.unidentified.img', changes.img)
}
