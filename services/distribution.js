class FlowDistribution {
  constructor(astrologers) {
    this.astrologers = astrologers;
  }

  distributeUsers(users) {
    const totalUsers = users.length;
    const totalAstrologers = this.astrologers.length;
    const connectionsPerAstrologer = Math.floor(totalUsers / totalAstrologers);
    let remainingConnections = totalUsers % totalAstrologers;

    for (let astrologer of this.astrologers) {
      astrologer.connections = connectionsPerAstrologer;
      if (remainingConnections > 0) {
        astrologer.connections++;
        remainingConnections--;
      }
    }

    // Adjust flow for top astrologers
    const topAstrologers = this.astrologers.filter(
      (ast) => ast.isTopAstrologer
    );
    for (let topAstrologer of topAstrologers) {
      topAstrologer.connections += 1; // Example adjustment, this can be customized
    }
  }

  toggleTopAstrologer(id, status) {
    const astrologer = this.astrologers.find((ast) => ast.id === id);
    if (astrologer) {
      astrologer.isTopAstrologer = status;
    }
  }
}

export default FlowDistribution;
