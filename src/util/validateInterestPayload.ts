export const validateInterestPayload = ({ initial, month, fee, period, feeType, periodType }: InterestPayload) => {

    const error: Error = { valid: true, error: [] }

    const setErrorMessage = (msg: string) => {
        error.valid = false;
        error.error.push(msg);
    }

    console.log(initial, month)

    if(isNaN(initial) || initial < 0)
        setErrorMessage('O Valor inicial precisa ser maior ou igual a 0')
    if(isNaN(month) || month <= 0)
        setErrorMessage('O Valor por mês precisa ser maior do que 0')
    if(isNaN(fee) || fee <= 0)
        setErrorMessage('O Valor da taxa precisa ser maior do que 0')
    if(isNaN(period) || period <= 0)
        setErrorMessage('O Valor do periodo precisa ser maior do que 0')
    if(feeType != 'year' && feeType != 'month')
        setErrorMessage('O valor do tipo de taxa precisa ser anual ou mensal')
    if(periodType != 'year' && periodType != 'month') 
        setErrorMessage('O valor do tipo de periodo precisa ser anual ou mensal');

    return error;
}

type Error = {
    valid: Boolean,
    error: string[]
}

type InterestPayload = {
    initial: number,
    month: number,
    fee: number,
    period: number,
    feeType: unknown,
    periodType: unknown
}