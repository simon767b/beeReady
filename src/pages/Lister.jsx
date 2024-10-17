import List from "../components/List";
import PlusButton from "../components/PlusButton";

export default function Lister() {
  return (
    <main className="lister">
      <section className="beehive">
        <List />
        <List />
        <List />
        <List />
        <List />
        <List />
        <List />
        <List />
        <List />
        <List />
        <List />
        <List />
        <List />
      </section>
      <PlusButton></PlusButton>
    </main>
  );
}
