import React, { Component } from 'react';
import packageJson from '../../../package.json';

type VersionComponentState = {
    reactVersion: string;
};

export class ReactVersion extends Component<{}, VersionComponentState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      reactVersion: packageJson.devDependencies.react ?? 'unknown'
    };
  }

  render() {
    const reactVersion = this.state.reactVersion;

    return (
      <div className="text-sm text-gray-700">
        <p>React version: <strong>{reactVersion}</strong></p>
      </div>
    );
  }
}