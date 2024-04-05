const Loader=()=> {
    const loaderStyle = {
      position: 'relative',
      width: '2.5em',
      height: '2.5em',
      transform: 'rotate(165deg)'
    };
  
    const beforeAfterStyle = {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      display: 'block',
      width: '0.5em',
      height: '0.5em',
      borderRadius: '0.25em',
      transform: 'translate(-50%, -50%)'
    };
  
    const beforeStyle = {
      ...beforeAfterStyle,
      animation: 'before8 2s infinite'
    };
  
    const afterStyle = {
      ...beforeAfterStyle,
      animation: 'after6 2s infinite'
    };
  
    return (
      <div style={loaderStyle} className="loader">
        <div style={beforeStyle} />
        <div style={afterStyle} />
      </div>
    );
  }
  export default Loader