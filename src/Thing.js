const Thing = () => (
    <Motion defaultStyle={{ opacity: 0 }} style={{ opacity: spring(1) }}>
      { (style) => <div style={style}>Can you see me?</div> }
    </Motion>
  )