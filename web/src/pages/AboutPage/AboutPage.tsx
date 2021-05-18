const AboutPage = () => {
  return (
    <div className="flex gap-6 justify-center mt-10 flex-wrap">
      <div className="card glass shadow-lg compact side bg-base-100 w-80 flex-shrink-0">
        <div className="flex-row items-center space-x-4 card-body">
          <div>
            <div className="avatar">
              <div className="rounded-full w-14 h-14 shadow">
                <img
                  alt="Peter Mitrovich"
                  src="https://ui-avatars.com/api/?name=Peter+Mitrovich"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="card-title">Peter Mitrovich</h2>
            <div className="badge badge-accent badge-outline text-xs">
              CEO/Founder
            </div>
          </div>
        </div>
      </div>
      <div className="card glass shadow-lg compact side bg-base-100 w-80 flex-shrink-0">
        <div className="flex-row items-center space-x-4 card-body">
          <div>
            <div className="avatar">
              <div className="rounded-full w-14 h-14 shadow">
                <img
                  alt="Brian YP Liu"
                  src="https://brianypliu.com/assets/images/avatar.png"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="card-title">
              <a
                href="https://brianypliu.com/"
                target="_blank"
                rel="noreferrer"
              >
                Brian YP Liu
              </a>
            </h2>
            <div className="badge badge-accent badge-outline text-xs">
              Engineering
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
