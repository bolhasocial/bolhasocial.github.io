import React, { Component } from "react";
import styles from "./ResultsGraph.module.scss";
import Graph from "vis-react";

class ResultsGraph extends Component {
  constructor() {
    super();
  }

  getColor(gistItem) {
    switch (gistItem.categoryTitle) {
      case "LINKEDIN":
      case "FACEBOOK":
      case "YOUTUBE":
      case "INSTAGRAM":
      case "CIÊNCIA":
      case "TECNOLOGIA":
      case "JOGOS":
        return "#82a8f7";

      case "CARROS":
      case "VIAGENS":
      case "MODA":
      case "INTERNACIONAL":
      case "TV E CELEBRIDADES":
      case "ESOTERISMO":
      case "EMPREGOS E CONCURSOS":
      case "HUMOR":
        return "#8877c6";

      case "FITNESS":
      case "ECONOMIA":
      case "EDUCACAO":
      case "SERIES E FILMES":
      case "POP/ARTE":
      case "SEXO":
        return "#e6937f";

      case "ALIMENTAÇÃO E SAÚDE":
      case "NATUREZA":
      case "POLITICA":
      case "NOTÍCIAS":
      case "CULINÁRIA":
      case "DECORAÇÃO":
        return "#84cbbb";
    }
  }

  render() {
    const { historyGist } = this.props;

    return (
      <Graph
        className={styles.graph}
        graph={{
          nodes: historyGist.totalPerCategory
            .filter(gistItem => gistItem.categoryOccurances > 0)
            .map(gistItem => ({
              ...gistItem,
              level: gistItem.categoryPercentage,
              value: gistItem.categoryPercentage,
              color: this.getColor(gistItem),
              title: gistItem.categoryPercentage.toFixed(2),
              label: `${
                gistItem.categoryTitle
              }\n${gistItem.categoryPercentage.toFixed(2)}%`
            })),
          edges: []
        }}
        options={{
          nodes: {
            borderWidth: 0,
            shape: "circle",
            font: {
              bold: {
                face: "Quicksand",
                mod: "bold",
                size: 1000
              },
              color: "#fff"
            },
            widthConstraint: { minimum: 120, maximum: 120 }
          },
          edges: {
            scaling: {
              customScalingFunction: (min, max, total, value) => {
                return gistItem.categoryPercentage * 100;
              }
            }
          },
          autoResize: true,
          height: "55%",
          width: "100%",
          physics: {
            stabilization: true,
            minVelocity: 0.01,
            minVelocity: 0.02,
            solver: "repulsion",
            repulsion: {
              nodeDistance: 100
            }
          },
          interaction: {
            dragView: false,
            zoomView: false
          }
        }}
      />
    );
  }
}

export default ResultsGraph;
