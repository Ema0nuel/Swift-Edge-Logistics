function n({size:e=32,color:i="#0d9488"}={}){return`
    <span class="globe-spinner" style="display:inline-block;width:${e}px;height:${e}px;vertical-align:middle;">
      <span style="
        box-sizing: border-box;
        display: block;
        width: 100%;
        height: 100%;
        border: 3px solid ${i};
        border-top: 3px solid transparent;
        border-radius: 50%;
        animation: globe-spin 0.8s linear infinite;
      "></span>
      <style>
        @keyframes globe-spin {
          100% { transform: rotate(360deg); }
        }
      </style>
    </span>
  `}export{n as G};
//# sourceMappingURL=GlobeSpinner-BshKxO8A.js.map
