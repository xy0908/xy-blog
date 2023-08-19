type child = {
  name: string;
  text: string
}

export default interface navData {
  name: string;
  text: string;
  icon: string;
  isActivation: boolean;
  children?: Array<child>
}

