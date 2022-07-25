const sdp = `v=0
o=qiniu-rtc-client 5975129998295344376 2 IN IP4 0.0.0.0
s=-
t=0 0
a=ice-lite
a=fingerprint:sha-256 9D:58:E2:29:F8:5B:61:FE:C1:73:3E:DF:6A:4A:18:21:25:90:DC:F6:33:B0:42:1A:54:9A:20:99:FA:54:56:F8
a=msid-semantic: WMS *
a=group:BUNDLE 0
m=audio 7 RTP/SAVPF 109
c=IN IP4 127.0.0.1
a=rtpmap:109 opus/48000/2
a=fmtp:109 stereo=1;useinbandfec=1;
a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level
a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid
a=setup:active
a=mid:0
a=inactive
a=ice-ufrag:ju9j0qk2lm3snjra
a=ice-pwd:gnuw179zm7cp0sk358z1ekecbohi9x9g
a=candidate:udpcandidate 1 udp 1076558079 180.101.136.199 38714 typ host
a=candidate:tcpcandidate 1 tcp 1076302079 180.101.136.199 38497 typ host tcptype passive
a=end-of-candidates
a=ice-options:renomination
a=rtcp-mux
a=rtcp-rsize
m=video 7 RTP/SAVPF 126 127
c=IN IP4 127.0.0.1
a=rtpmap:126 H264/90000
a=rtpmap:127 rtx/90000
a=fmtp:126 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f;
a=fmtp:127 apt=126;
a=rtcp-fb:126 ccm fir
a=rtcp-fb:126 goog-remb
a=rtcp-fb:126 nack
a=rtcp-fb:126 nack pli
a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid
a=extmap:4 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time
a=extmap:5 urn:ietf:params:rtp-hdrext:toffset
a=setup:active
a=mid:1
a=inactive
a=ice-ufrag:ju9j0qk2lm3snjra
a=ice-pwd:gnuw179zm7cp0sk358z1ekecbohi9x9g
a=candidate:udpcandidate 1 udp 1076558079 180.101.136.199 38714 typ host
a=candidate:tcpcandidate 1 tcp 1076302079 180.101.136.199 38497 typ host tcptype passive
a=end-of-candidates
a=ice-options:renomination
a=rtcp-mux
a=rtcp-rsize
m=audio 7 RTP/SAVPF 109
c=IN IP4 127.0.0.1
a=rtpmap:109 opus/48000/2
a=fmtp:109 stereo=1;useinbandfec=1;
a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level
a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid
a=setup:active
a=mid:5
a=recvonly
a=ice-ufrag:ju9j0qk2lm3snjra
a=ice-pwd:gnuw179zm7cp0sk358z1ekecbohi9x9g
a=candidate:udpcandidate 1 udp 1076558079 180.101.136.199 38714 typ host
a=candidate:tcpcandidate 1 tcp 1076302079 180.101.136.199 38497 typ host tcptype passive
a=end-of-candidates
a=ice-options:renomination
a=rtcp-mux
a=rtcp-rsize
m=video 0 RTP/SAVPF 126 127
c=IN IP4 127.0.0.1
a=rtpmap:126 H264/90000
a=rtpmap:127 rtx/90000
a=fmtp:126 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f;
a=fmtp:127 apt=126;
a=rtcp-fb:126 ccm fir
a=rtcp-fb:126 goog-remb
a=rtcp-fb:126 nack
a=rtcp-fb:126 nack pli
a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid
a=extmap:4 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time
a=extmap:5 urn:ietf:params:rtp-hdrext:toffset
a=setup:active
a=mid:4
a=inactive
a=ice-ufrag:ju9j0qk2lm3snjra
a=ice-pwd:gnuw179zm7cp0sk358z1ekecbohi9x9g
a=candidate:udpcandidate 1 udp 1076558079 180.101.136.199 38714 typ host
a=candidate:tcpcandidate 1 tcp 1076302079 180.101.136.199 38497 typ host tcptype passive
a=end-of-candidates
a=ice-options:renomination
a=rtcp-mux
a=rtcp-rsize
a=rid:hi recv
a=rid:lo recv
a=simulcast:recv hi;lo
m=video 7 RTP/SAVPF 126 127
c=IN IP4 127.0.0.1
a=rtpmap:126 H264/90000
a=rtpmap:127 rtx/90000
a=fmtp:126 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f;
a=fmtp:127 apt=126;
a=rtcp-fb:126 ccm fir
a=rtcp-fb:126 goog-remb
a=rtcp-fb:126 nack
a=rtcp-fb:126 nack pli
a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid
a=extmap:4 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time
a=extmap:5 urn:ietf:params:rtp-hdrext:toffset
a=setup:active
a=mid:6
a=recvonly
a=ice-ufrag:ju9j0qk2lm3snjra
a=ice-pwd:gnuw179zm7cp0sk358z1ekecbohi9x9g
a=candidate:udpcandidate 1 udp 1076558079 180.101.136.199 38714 typ host
a=candidate:tcpcandidate 1 tcp 1076302079 180.101.136.199 38497 typ host tcptype passive
a=end-of-candidates
a=ice-options:renomination
a=rtcp-mux
a=rtcp-rsize`;

// const sdp = `v=0
//     a=1
//     m=audio
//     a=inactive
//     m=video
//     a=inactive
//     m=audio
//     a=revonly
//     m=video
//     a=revonly`;

const sdpLines = sdp.split("\n");

const sdpGroups = [];

const processMedia = (sdpLines) => {
  let missMEqual = false;
  let groupLines = [];
  let group = [];
  sdpLines.forEach((sdpStr) => {
    missMEqual =
      sdpStr.indexOf("m=video") > -1 || sdpStr.indexOf("m=audio") > -1;
    console.log(missMEqual);
    if (!missMEqual) {
      group.push(sdpStr);
    } else {
      console.log(group);
      const inactive = group.some((g) => g.indexOf("a=inactive") > -1);
      console.log("inactive", inactive);
      if (inactive) {
        group = group.filter(
          (item) =>
            item.indexOf("a=rid:") === -1 && item.indexOf("a=simulcast:") === -1
        );
      }
      groupLines.push([...group]);
      missMEqual = false;
      group = [sdpStr];
    }
  });
  if (group.length > 0) {
    groupLines.push([...group]);
  }

  let availableLines = [];
  groupLines.forEach(
    (group) => (availableLines = availableLines.concat(group))
  );

  console.log(availableLines.join("\n"));
};

processMedia(sdpLines);
