import CardVuelo from "../../UI/CardVuelo/CardVuelo.jsx";
import styles from "./VuelosGrid.module.css";
function VueloGrid(params) {
    return (
        <section className={styles.VuelosSection}>
            <main className={styles.grid}>
            <CardVuelo />
            <CardVuelo />
            <CardVuelo />
            <CardVuelo />
            <CardVuelo />
            <CardVuelo />
            </main>
        </section>
    )
}
export default VueloGrid;