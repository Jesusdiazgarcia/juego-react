export const Square = ({ children, isSelected, updateBoard, index}) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`;
   // Define la función shift, que se llama cuando se hace clic en el cuadro
    const shift = () => {
     updateBoard(index)
    }
    // Devuelve un div representando el cuadro, con la clase y el contenido proporcionados
    return (
      <div onClick={shift} className={className}>
        {children}
      </div>
    )
  }