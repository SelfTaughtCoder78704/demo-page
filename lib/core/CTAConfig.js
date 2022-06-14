import { createContext, useContext, useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { addTrackingToCTAs } from '@core/tracking'

const CTAConfigContext = createContext({})

const createParamObject = (incomingParams, enabledParams) => {
  const paramObject = {}

  Object.keys(enabledParams).forEach((param) => {
    const enabledParamValue = enabledParams[param]
    const defaultValue =
      typeof enabledParamValue === 'string' ? enabledParamValue : incomingParams[param]

    if (defaultValue) {
      paramObject[param] = defaultValue
    }
  })

  return paramObject
}

const createQueryString = (paramObject) => {
  const queryString = Object.keys(paramObject).map((param) => `${param}=${paramObject[param]}`)

  return `?${queryString}`
}

const appendQueryStringToCTAs = (btns, queryString) => {
  if (queryString.length > 1) {
    btns.forEach((btn) => (btn.href = `${btn.href.split('?')[0]}${queryString}`))
  }
}

export const CTAConfig = ({
  /* Params that are allowed to pass through and be added to CTA hrefs */
  enabledParams = {},
  /* React children */
  children,
}) => {
  const [config, setConfig] = useState(enabledParams)
  const btnsRef = useRef(null)
  const router = useRouter()
  const params = router.query
  const domLoaded = typeof document !== 'undefined'

  useEffect(() => {
    if (domLoaded) {
      const paramObject = createParamObject(params, config)
      const queryString = createQueryString(paramObject)
      if (!btnsRef.current) btnsRef.current = [...document.querySelectorAll('a:not([href="#"])')]
      const btns = btnsRef.current

      appendQueryStringToCTAs(btns, queryString)
      addTrackingToCTAs(btns)
    }
  }, [params, config, domLoaded])

  /**
   * Overrides CTA param config. Wrapped in useEffect hook.
   *
   * @typedef {Function} useOverrideCTA
   * @param {Object} overrideParams - map of params and their override values
   */
  const useOverrideCTA = (overrideParams) =>
    useEffect(() => {
      setConfig({ ...config, ...overrideParams })
    }, [overrideParams])

  /**
   * Helper function to get current param object.
   *
   * @typedef {Function} getParamObject
   * @returns {Object} - map of current params
   */
  const getParamObject = () => createParamObject(params, config)

  const values = {
    useOverrideCTA,
    getParamObject,
  }

  return <CTAConfigContext.Provider value={values}>{children}</CTAConfigContext.Provider>
}

/**
 * @typedef {Object} CTAConfigValues
 * @property {useOverrideCTA} useOverrideCTA
 * @property {getParamObject} getParamObject
 */

/**
 * CTA config hook to access context values.
 *
 * @returns {CTAConfigValues}
 */
export const useCTAConfig = () => {
  return useContext(CTAConfigContext)
}
