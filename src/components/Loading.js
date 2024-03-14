function Loading() {
  return(
    <div className="container mt-3">
    <div className="d-flex justify-content-center">
    <span>Please Wait....  </span>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
  </div>
  )
}
export default Loading;