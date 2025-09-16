const CreateClass = ({ isPadded }) => {
  return (
    <>
      <div
        className="main flex"
        style={{ paddingLeft: isPadded ? "200px" : "20px" }}
      >
        <div className="maincontent">
          <div className="main-content">
            <div className="out-let">
              <Outlet />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateClass;
