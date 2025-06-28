import styles from "./styles.module.css"
import React, {useRef} from "react";

const Slider = ({children, step = 150}) => {
  const sliderRef = useRef(null)

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: sliderRef.current.scrollLeft - 150, behavior: 'smooth' // Плавная прокрутка
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: sliderRef.current.scrollLeft + 150, behavior: 'smooth' // Плавная прокрутка
      });
    }
  };

  return <div className={styles.slider}>
    <button
      onClick={scrollLeft}
      className={styles.arrow}
      type="button"
    >
      {'<'}
    </button>
    {React.cloneElement(children, {ref: sliderRef})}
    <button
      onClick={scrollRight}
      className={styles.arrow}
      type="button"
    >
      {'>'}
    </button>
  </div>
}

export default Slider