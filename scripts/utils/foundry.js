import MODULE_ID from './module.js'

/** @param {string[]} path */
function getSettingLocalizationPath(...path) {
    return `${MODULE_ID}.settings.${path.join('.')}`
}

/**
 * @template {*} T
 * @param {Omit<RequiredBy<SettingConfig<T>, 'name'>, 'key' | 'namespace'>} options
 * options.scope = 'world'
 *
 * options.config = false
 */
export function registerSetting(options) {
    const name = options.name
    options.scope = options.scope ?? 'world'
    options.config = options.config ?? false
    if (options.config) {
        options.name = getSettingLocalizationPath(name, 'Name')
        options.hint = getSettingLocalizationPath(name, 'Hint')
    }
    game.settings.register(MODULE_ID, name, options)
}

/**@param {string} key*/
export function getSetting(key) {
    return game.settings.get(MODULE_ID, key)
}
