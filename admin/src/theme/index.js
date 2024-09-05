// theme/index.js
const theme = {
  colors: {
    primary: ["#6092FE", "#2457C5", "green", "blue"],
    btncolor: ["#6092FE", "#28A745", "#2457C5"],
    background: ["#E5ECFA"],
    textcolor: ["#102a43","#000000"], 
  },
  components: {
    // Override default styles for the Text component
    Text: {
      styles: (theme) => ({
        root: {
          color: theme.colors.textcolor[0], // Apply the custom text color
        },
      }),
    },
    // You can also override styles for other components like Title, Paragraph, etc.
  },
};

export default theme;
