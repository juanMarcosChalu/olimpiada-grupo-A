import CardVuelo from "../../UI/CardVuelo/CardVuelo.jsx";
import styles from "./VuelosGrid.module.css";
function VueloGrid(params) {
    return(
    <section className={styles.VuelosSection}>
        <CardVuelo/>
        <CardVuelo/>
         <CardVuelo/>
          <CardVuelo/>
           <CardVuelo/>
            <CardVuelo/>
    </section>
    )
}
export default VueloGrid;