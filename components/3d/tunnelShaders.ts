export const tunnelVertexShader = `
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const tunnelFragmentShader = `
  #include <common>
  
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec2 vUv;
  
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uMouse;
  
  // Simplex-like noise
  float hash(vec3 p) {
    return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
  }
  
  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float n000 = hash(i + vec3(0.0, 0.0, 0.0));
    float n100 = hash(i + vec3(1.0, 0.0, 0.0));
    float n010 = hash(i + vec3(0.0, 1.0, 0.0));
    float n110 = hash(i + vec3(1.0, 1.0, 0.0));
    float n001 = hash(i + vec3(0.0, 0.0, 1.0));
    float n101 = hash(i + vec3(1.0, 0.0, 1.0));
    float n011 = hash(i + vec3(0.0, 1.0, 1.0));
    float n111 = hash(i + vec3(1.0, 1.0, 1.0));
    
    float n00 = mix(n000, n100, f.x);
    float n10 = mix(n010, n110, f.x);
    float n01 = mix(n001, n101, f.x);
    float n11 = mix(n011, n111, f.x);
    
    float n0 = mix(n00, n10, f.y);
    float n1 = mix(n01, n11, f.y);
    
    return mix(n0, n1, f.z);
  }
  
  void main() {
    vec2 uv = vUv;
    
    // Tube mapping
    float angle = atan(vPosition.y, vPosition.x);
    float dist = length(vPosition.xy);
    
    // Ripple effect along Z
    float ripple = sin(vPosition.z * 2.0 - uTime * 2.0) * 0.05;
    float radiusVariation = 1.0 + ripple;
    
    // Noise distortion
    float noiseVal = noise(vPosition * 0.5 + vec3(0.0, 0.0, uTime * 0.3));
    float distortion = noiseVal * 0.1;
    
    // Calculate tunnel walls
    float tunnel = smoothstep(1.05, 0.95, dist / (radiusVariation + distortion));
    
    // Color based on position
    vec3 color = mix(
      vec3(0.0, 0.8, 1.0),  // Cyan
      vec3(0.6, 0.2, 1.0),  // Purple
      sin(vPosition.z * 0.3 + uTime) * 0.5 + 0.5
    );
    
    // Intensity falloff toward edges
    float edge = smoothstep(1.1, 0.8, dist);
    color += edge * vec3(1.0, 0.3, 0.8) * 0.5;
    
    // Glow effect
    float glow = exp(-dist * 0.5) * 0.3;
    color += glow * vec3(0.0, 1.0, 1.0);
    
    gl_FragColor = vec4(color * tunnel, tunnel);
  }
`;

export const motesVertexShader = `
  uniform float uTime;
  varying vec3 vColor;
  
  void main() {
    vec3 pos = position;
    pos.z += uTime * 3.0;
    
    vColor = color;
    gl_PointSize = 2.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const motesFragmentShader = `
  varying vec3 vColor;
  
  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    gl_FragColor = vec4(vColor, alpha * 0.8);
  }
`;

export const bloomPrefilterShader = `
  uniform sampler2D uTexture;
  uniform float uThreshold;
  
  varying vec2 vUv;
  
  void main() {
    vec4 color = texture2D(uTexture, vUv);
    float brightness = dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));
    
    if (brightness > uThreshold) {
      gl_FragColor = color;
    } else {
      gl_FragColor = vec4(0.0);
    }
  }
`;

export const bloomBlurShader = `
  uniform sampler2D uTexture;
  uniform vec2 uDirection;
  uniform vec2 uResolution;
  
  varying vec2 vUv;
  
  void main() {
    vec4 color = vec4(0.0);
    vec2 off = uDirection / uResolution;
    
    float weights[5] = float[](0.227027, 0.1945946, 0.1216216, 0.054054, 0.016216);
    
    color += texture2D(uTexture, vUv) * weights[0];
    
    for (int i = 1; i < 5; i++) {
      color += texture2D(uTexture, vUv + off * float(i)) * weights[i];
      color += texture2D(uTexture, vUv - off * float(i)) * weights[i];
    }
    
    gl_FragColor = color;
  }
`;

export const compositeShader = `
  uniform sampler2D uScene;
  uniform sampler2D uBloom;
  
  varying vec2 vUv;
  
  void main() {
    vec4 scene = texture2D(uScene, vUv);
    vec4 bloom = texture2D(uBloom, vUv);
    
    gl_FragColor = scene + bloom;
  }
`;
