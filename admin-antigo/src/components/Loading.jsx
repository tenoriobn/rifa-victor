export default function Loading(props) {
  const usePrimary = props.usePrimary;

  return (
    <div className={`lds-roller ${usePrimary && "lds-primary"}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
