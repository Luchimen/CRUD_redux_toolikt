export const Alerta = ({ alert }) => {
  return (
    <p
      className={`${
        alert.error ? "bg-red-600" : "bg-green-700"
      } text-lg uppercase w-10/12 rounded-lg shadow text-white m-auto text-center py-2 font-semibold`}
    >
      {alert.msg}
    </p>
  );
};
