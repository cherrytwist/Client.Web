import React, { FC, useCallback, useState } from 'react';
import { Maybe, Lifecycle } from '../../types/graphql-schema';
import { createStyles, useTheme } from '../../hooks/useTheme';
import Typography from '../core/Typography';
import { Modal } from 'react-bootstrap';
import Button from '../core/Button';
import { createMachine } from 'xstate';
import { toDirectedGraph } from '@xstate/graph';

import * as d3 from 'd3';

export interface ActivityCardItemProps {
  lifecycle?: Maybe<Lifecycle>;
}

const useCardStyles = createStyles(theme => ({
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: theme.shape.spacing(2),

    '& > p': {
      marginBottom: 0,
      textTransform: 'capitalize',
    },
  },
}));

const useUserPopUpStyles = createStyles(theme => ({
  body: {
    maxHeight: 600,
    overflow: 'auto',
  },
  activeState: {
    color: theme.palette.neutralLight,
  },
}));

export interface LifecycleModalProps {
  lifecycle: Lifecycle;
  show: boolean;
  onHide: () => void;
}

const LifecycleModal: FC<LifecycleModalProps> = ({ lifecycle, show = false, onHide = () => {} }) => {
  const styles = useUserPopUpStyles();
  const theme = useTheme().theme;

  const machine = createMachine(JSON.parse(lifecycle.machineDef));
  const graph = toDirectedGraph(machine);

  // First filter all nodes to find current state, then deduce nextStates from its edges
  const nextStates = graph.children
    .filter(child => lifecycle.state && child.id.endsWith(lifecycle.state))
    .pop()
    ?.edges.map(edge => edge.target.id.split('.').pop())
    .join(', ');

  // const location = useLocation();

  const divRef = useCallback(
    svgRef => {
      if (lifecycle) {
        const width = 800;
        const height = 400;

        // const boxWidth = 120;
        // const boxHeight = 30;
        // const cornerRound = 10;

        // const initialState: string = machine.id + '.' + machine.initial?.toString();

        // const nodes = graph.children.map(node => {
        //   // 2 is current state
        //   const group = lifecycle.state && node.id.endsWith(lifecycle.state) ? 2 : 1;
        //   if (node.id.endsWith(initialState)) {
        //     return {
        //       id: node.id,
        //       group: group,
        //       fx: boxWidth / 2 + 10,
        //     };
        //   }

        //   if (node.stateNode.type === 'final') {
        //     return {
        //       id: node.id,
        //       group: group,
        //       fx: width - boxWidth / 2 - 10,
        //     };
        //   }
        //   return {
        //     id: node.id,
        //     group: group,
        //   };
        // });
        // console.log(graph.children);
        // const links = graph.children.flatMap(node =>
        //   node.edges.map(edge => ({
        //     source: edge.source.id,
        //     target: edge.target.id,
        //     id: edge.id,
        //     label: edge.transition.eventType,
        //   }))
        // );
        // const simulation = d3
        //   .forceSimulation(nodes)
        //   .force(
        //     'link',
        //     d3.forceLink(links).id(d => d.id)
        //   )
        //   .force('charge', d3.forceManyBody().strength(-100))
        //   .force('collide', d3.forceCollide().radius(80).iterations(2))
        //   .force('center', d3.forceCenter(width / 2, height / 2));

        const svg = d3.select(svgRef);
        svg.select('*').remove();
        svg.attr('xmlns', 'http://www.w3.org/2000/svg');
        svg.attr('xmlns:xlink', 'http://www.w3.org/1999/xlink');

        const defs = svg.append('svg:defs');
        defs
          .append('svg:marker')
          .attr('id', 'end-arrow')
          .attr('viewBox', '0 -5 10 10')
          .attr('refX', 10)
          .attr('markerWidth', 10.5)
          .attr('markerHeight', 10.5)
          .attr('orient', 'auto')
          .append('svg:path')
          .attr('d', 'M0,-5L10,0L0,5');

        const filter = defs
          .append('filter')
          .attr('id', 'drop-shadow')
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', '200%')
          .attr('height', '200%');

        filter
          .append('feDropShadow')
          .attr('dx', 2)
          .attr('dy', 2)
          .attr('stdDeviation', 1)
          .attr('flood-color', '#000')
          .attr('flood-opacity', 1);

        svg.attr('viewBox', [0, 0, width, height]);
        // const link = svg
        //   .append('g')
        //   .attr('stroke', '#000')
        //   .attr('stroke-opacity', 0.6)
        //   .selectAll('path')
        //   .data(links)
        //   .join('path')
        //   .attr('id', d => d.id)
        //   .attr('stroke-width', _ => 1)
        //   .style('marker-end', 'url(#end-arrow)');

        svg.append('path').attr('id', 'MyPath').attr('stroke', 'red').attr('d', 'M 100 100 L 200 200');

        svg
          .append('text')
          .attr('font', theme.typography.button.font)
          .attr('font-size', theme.typography.button.size)
          .attr('x', 50)
          .attr('y', 50)
          .attr('fill', 'red')
          .text('TEST');

        svg
          .append('text')
          .attr('font', theme.typography.button.font)
          .attr('font-size', theme.typography.button.size)
          .attr('x', 50)
          .attr('y', 50)
          .attr('fill', 'red')
          .append('textpath')
          .attr('href', '#MyPath')
          .text('TEST');

        //const LinkLabelTest2 = svg.append('text').attr('x', '10').attr('y', '10').attr('class', 'small').text('TEST2');
        // const linkLabels = svg
        //   .append('g')
        //   .selectAll('text')
        //   .data(links)
        //   .join('text')
        //   .attr('font-weight', 400)
        //   .attr('fill', theme.palette.primary)
        //   .attr('font', theme.typography.button.font)
        //   .attr('font-size', theme.typography.button.size)
        //   .append('textpath')
        //   .attr('xlink:href', d => '#' + d.id)
        //   .text('TEST');
        // const node = svg
        //   .append('g')
        //   .attr('class', 'nodes')
        //   .attr('stroke-width', 1.5)
        //   .selectAll('rect')
        //   .data(nodes)
        //   .enter()
        //   .append('rect')
        //   .attr('stroke', d => (d.group === 1 ? '#000' : theme.palette.primary))
        //   .attr('width', boxWidth)
        //   .attr('height', boxHeight)
        //   .attr('rx', cornerRound)
        //   .attr('ry', cornerRound)
        //   .attr('fill', '#fff')
        //   .style('filter', 'url(#drop-shadow)');
        // const text = svg
        //   .append('g')
        //   .attr('class', 'text')
        //   .attr('stroke-width', 1.5)
        //   .selectAll('text')
        //   .data(nodes)
        //   .enter()
        //   .append('text')
        //   .attr('x', '50%')
        //   .attr('y', boxHeight)
        //   .attr('dx', boxWidth / 2)
        //   .attr('dy', boxHeight / 2)
        //   .attr('fill', d => (d.group === 1 ? '#000' : theme.palette.primary))
        //   .attr('font-weight', 400)
        //   .attr('font', theme.typography.button.font)
        //   .attr('font-size', theme.typography.button.size)
        //   .attr('text-anchor', 'middle')
        //   .attr('dominant-baseline', 'central')
        //   .text(d => d.id.split('.').pop());
        // node.append('title').text(d => d.id);

        // simulation.on('tick', () => {
        //   link.attr('d', d => {
        //     let change = 0;
        //     if (Math.abs(d.target.x - d.source.x) > boxWidth) {
        //       // Boxes are far apart, draw from corner
        //       const direction = Math.sign(d.target.x - d.source.x);
        //       change = (direction * (boxWidth - cornerRound / 2)) / 2;
        //     }
        //     const x1 = d.source.x + change;
        //     change = 0;
        //     if (Math.abs(d.target.y - d.source.y) > boxHeight) {
        //       // Boxes are far apart, draw from corner
        //       const direction = Math.sign(d.target.y - d.source.y);
        //       change = (direction * (boxHeight - cornerRound / 2)) / 2;
        //     }
        //     const y1 = d.source.y + change;
        //     change = 0;
        //     if (Math.abs(d.target.x - d.source.x) > boxWidth) {
        //       // Boxes are far apart, draw from corner
        //       const direction = -Math.sign(d.target.x - d.source.x);
        //       change = (direction * (boxWidth - cornerRound / 2)) / 2;
        //     }
        //     const x2 = d.target.x + change;
        //     change = 0;
        //     if (Math.abs(d.target.y - d.source.y) > boxHeight) {
        //       // Boxes are far apart, draw from corner
        //       const direction = -Math.sign(d.target.y - d.source.y);
        //       change = (direction * (boxHeight - cornerRound / 2)) / 2;
        //     }
        //     const y2 = d.target.y + change;

        //     return 'M ' + x1 + ' ' + y1 + 'L ' + x2 + ' ' + y2;
        //   });

        //   node.attr('x', d => d.x - boxWidth / 2).attr('y', d => d.y - boxHeight / 2);
        //   text.attr('x', d => d.x - boxWidth / 2).attr('y', d => d.y - boxHeight / 2);
        // });
        // simulation.tick(1000);
        // //simulation.stop();
        // setTimeout(() => {
        //   simulation.stop();
        // }, 1);
      }
    },
    [lifecycle]
  );

  return (
    <div>
      <Modal size="lg" show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Current state: {lifecycle.state}
            {nextStates && <p>Next states: {nextStates}</p>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.body}>
          <svg id="graph-container" ref={divRef}></svg>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const StateActivityCardItem: FC<ActivityCardItemProps> = ({ lifecycle = null }) => {
  const [modalVisible, setModalVisible] = useState<boolean>();
  const styles = useCardStyles();
  if (lifecycle == null) {
    return null;
  }

  // TODO: How to get the button to match theme?

  return (
    <div>
      <div className={styles.item}>
        <Typography as={'p'}>Status:</Typography>
        <Button onClick={() => setModalVisible(true)}>{lifecycle?.state}</Button>
      </div>
      <LifecycleModal
        lifecycle={lifecycle}
        show={modalVisible || false}
        onHide={() => {
          setModalVisible(false);
        }}
      ></LifecycleModal>
    </div>
  );
};

export default StateActivityCardItem;
