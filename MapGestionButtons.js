const MapGestionButtons = () => {
  return (
    <div>
      <div>
        <Button
          className="_button"
          // fullWidth={true}
          width="2em"
          onClick={() =>
            // this.deplacerRobot(this.state.xCoord, this.state.yCoord)
            this.editDestinations()
          }
          variant="outlined"
          color="primary"
          size="medium"
          disabled={moving}
        >
          {!choosingDest ? "Mode Edition" : "Ajouter une destination"}
        </Button>
      </div>
    </div>
  );
};

export default MapGestionButtons;
