

export default function Wrapper(fn) {

  return async (req, res, next) => {
    try {

      await fn(req, res, next)

    } catch (error) {
      res.send(505).json({
        sucess: false,
        error: error.message
      })
    }
  }
}