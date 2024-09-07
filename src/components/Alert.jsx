export const Alert = ({ alert }) => {
  return (
    <>
      {alert.alertType.color === "green" ? (
        <div
          className={`rounded-md bg-green-200 p-4 shadow-lg`}
        >
          <div className="flex gap-2">
            <div className="flex-shrink-0">
              <alert.Icon
                size={40}
                className={`text-green-800`}
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className={`font-bold text-green-800`}>
                {alert.alertType.type}
              </h3>
              <p
                className={`text-sm font-medium text-green-800`}
              >
                {alert.msg}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`rounded-md bg-red-200 p-4 shadow-lg`}
        >
          <div className="flex gap-2">
            <div className="flex-shrink-0">
              <alert.Icon
                size={40}
                className={`text-red-800`}
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className={`font-bold text-red-800`}>
                {alert.alertType.type}
              </h3>
              <p
                className={`text-sm font-medium text-red-800`}
              >
                {alert.msg}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/**
 * <div className={`rounded-md bg-${alert.alertType.color}-200 p-4 shadow-lg`}>
      <div className="flex gap-2">
        <div className="flex-shrink-0">
          <alert.Icon
            size={40}
            className={`text-${alert.alertType.color}-800`}
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className={`font-bold text-${alert.alertType.color}-800`}>{alert.alertType.type}</h3>
          <p className={`text-sm font-medium text-${alert.alertType.color}-800`}>{alert.msg}</p>
        </div>
      </div>
    </div>
 */
