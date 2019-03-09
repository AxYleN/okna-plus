export default function Loading({ children, placeholder, loaded }) {
  return loaded ? children : placeholder;
}