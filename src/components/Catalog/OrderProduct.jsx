export const OrderProduct = ({ name, amount }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-7">
          <p>{name}</p>
        </div>
        <div className="col-xs-5">
          <p>
            <b>Количество:</b> {amount}
          </p>
        </div>
      </div>
    </div>
  );
};
