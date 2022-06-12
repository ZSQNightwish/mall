<template>
  <div class="wrapper">
    <ul class="content">
      <li>列表11</li>
      <li>列表12</li>
      <li>列表13</li>
      <li>列表14</li>
      <li>列表15</li>
      <li>列表16</li>
      <li>列表17</li>
      <li>列表18</li>
      <li>列表19</li>
      <li>列表110</li>
      <li>列表111</li>
      <li>列表112</li>
      <li>列表113</li>
      <li>列表114</li>
      <li>列表115</li>
      <li>列表116</li>
      <li>列表117</li>
      <li>列表118</li>
      <li>列表119</li>
      <li>列表120</li>
      <li>列表121</li>
      <li>列表122</li>
      <li>列表123</li>
      <li>列表124</li>
      <li>列表125</li>
      <li>列表126</li>
      <li>列表127</li>
      <li>列表128</li>
      <li>列表129</li>
      <li>列表130</li>
      <li>列表131</li>
      <li>列表132</li>
      <li>列表133</li>
      <li>列表134</li>
      <li>列表135</li>
      <li>列表136</li>
      <li>列表137</li>
      <li>列表138</li>
      <li>列表139</li>
      <li>列表140</li>
      <li>列表141</li>
      <li>列表142</li>
      <li>列表143</li>
      <li>列表144</li>
      <li>列表145</li>
      <li>列表146</li>
      <li>列表147</li>
      <li>列表148</li>
      <li>列表149</li>
      <li>列表150</li>
      <li>列表151</li>
      <li>列表152</li>
      <li>列表153</li>
      <li>列表154</li>
      <li>列表155</li>
      <li>列表156</li>
      <li>列表157</li>
      <li>列表158</li>
      <li>列表159</li>
      <li>列表160</li>
      <li>列表161</li>
      <li>列表162</li>
      <li>列表163</li>
      <li>列表164</li>
      <li>列表165</li>
      <li>列表166</li>
      <li>列表167</li>
      <li>列表168</li>
      <li>列表169</li>
      <li>列表170</li>
      <li>列表171</li>
      <li>列表172</li>
      <li>列表173</li>
      <li>列表174</li>
      <li>列表175</li>
      <li>列表176</li>
      <li>列表177</li>
      <li>列表178</li>
      <li>列表179</li>
      <li>列表180</li>
      <li>列表181</li>
      <li>列表182</li>
      <li>列表183</li>
      <li>列表184</li>
      <li>列表185</li>
      <li>列表186</li>
      <li>列表187</li>
      <li>列表188</li>
      <li>列表189</li>
      <li>列表190</li>
      <li>列表191</li>
      <li>列表192</li>
      <li>列表193</li>
      <li>列表194</li>
      <li>列表195</li>
      <li>列表196</li>
      <li>列表197</li>
      <li>列表198</li>
      <li>列表199</li>
      <li>列表1100</li>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll"

export default {
  name: "cateogry",
  data() {
    return {
      scroll: null
    }
  },
  created() {
    /* this.scroll = new BScroll(this.$refs.aaa, {})*/
  },
  mounted() {
    this.scroll = new BScroll(document.querySelector('.wrapper'), {
      probeType: 3,
      pullUpLoad:false
    })
    this.scroll.on('scroll',(position)=>{
    })
    this.scroll.on('pullingUp',()=>{
      console.log('so on');
    })
  }
}
</script>

<style scoped>
.content {
  height: 350px;
  background-color: red;
  overflow: hidden;
}
</style>
