import icon from "../../estilos/media/question-mark.svg";
export const Card = ({ card, onClick }) => {
  return (
    <div
      className={`card-component  ${
        card.selected !== undefined ? " card-selected-" + card.selected : ""
      }`}
      id={card.id}
      data-testid={"componente-tablero-card_" + card.id}
      onClick={() => onClick(card.id)}
    >
      {card.isFlipped ? (
        <div className="card-front">
          <span>
            <strong>{card.id}</strong>
          </span>
        </div>
      ) : (
        <div className="card-back">
          <img src={icon} alt="Seleccionar carta" />
        </div>
      )}
    </div>
  );
};
