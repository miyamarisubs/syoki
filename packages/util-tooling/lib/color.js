const colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray'];

const hash = str => {
    const bits = [...Buffer.from(str)].reduce((xs, x) => [...xs, ...x.toString(2).padStart(8, '0')], []);
    const triples = [];

    for (let i = 0; i < bits.length; i += 3) {
        triples.push([bits[i], bits[i + 1], bits[i + 2]].join(''));
    }

    triples[triples.length - 1] = triples[triples.length - 1].padEnd(3, '0');

    if (triples.length === 0) {
        return 0;
    } else {
        return triples.map(x => parseInt(x, 2)).reduce((hash, x) => hash ^ x) & 0b111;
    }
};

const color = str => colors[hash(str)];

module.exports = { color };
