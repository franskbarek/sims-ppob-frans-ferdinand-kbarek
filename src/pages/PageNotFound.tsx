import React from 'react'

export default function PageNotFound(): JSX.Element {
  return (
    <div className="page-wrap d-flex flex-row align-items-center m-auto">
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-12 text-center">
                <span className="display-1 d-block">404</span>
                <div className="mb-4 lead">Ops Halaman ga tersedia <br/> jangan yadeya..</div>
                <a href="/" className="btn btn-link">Balik ke home</a>
            </div>
        </div>
    </div>
</div>
  )
}
