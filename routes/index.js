var express = require('express');
var router = express.Router();
const config = require('config')
const AWS = require('aws-sdk');
const request = require('request')
const { exec } = require('child_process');
const util = require('util')
    // AWS.config.update({
    //     accessKeyId: config.get('aws.access_key_id'),
    //     secretAccessKey: config.get('aws.secret_access_key'),
    //     region: 'eu-central-1'
    // });
    // const eks = new AWS.EKS();


// const { KubeConfig, Client } = require('kubernetes-client')
// const kubeconfig = new KubeConfig()
// kubeconfig.loadFromFile('./kubeconfig_g9')
// const Request = require('kubernetes-client/backends/request')

// const backend = new Request({ kubeconfig })
// const client = new Client({ backend, version: '1.13' })


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/list-clusters', function(req, res, next) {
    eks.listClusters({}, function(err, desc) {
        if (err) {
            console.log(err)
            res.status(500).send()
        } else {
            res.json(desc)
        }
    })
});

router.get('/describe', function(req, res, next) {
    eks.describeCluster({ name: 'g9' }, function(err, desc) {
        if (err) {
            console.log(err)
            res.status(500).send()
        } else {
            res.json(desc)
        }
    })
});

router.get('/delete-pod/:pod_name', function(req, res, next) {
    // const headers = {
    //   Authorization: 'Bearer ' + 'eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZWZhdWx0Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6ImRlZmF1bHQtdG9rZW4tcDl6NzIiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiZGVmYXVsdCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6IjY1MDllNDc2LWE3NmUtMTFlOS1hMDZmLTA2YTA2MjMzM2RkMiIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDpkZWZhdWx0OmRlZmF1bHQifQ.x186XcfBL4oka_L3npsMb1w0RVGdWV-Fq02nlY7j429VHXVdMX0Pbfmvd7_WDgDeJ2-dSxfqy67ChlEvlcPXqt5sijn2dD5-WCp44uuEv5d0P06CmYvm4yN3ICcyCNtbc6C02Q8MK3UvxDKF4KswHce0fEg3JDFhBwBsQgrtp6yU9xFqG0A02I7Sf5081YOJG6kg2kClLLSgQ2a9sQuKFkFlQWMOyJ7yAccOw4QoKX7DJBEP_aGe5nYoK375_0-8bGMwcczuT0GrdPcJaXQOyjtOpMuiCdElbHFWAx-_0uESEsGnC56SkYUg8wH9MrQpb7xnI7Ksz9xiVoDnD1nwOg'
    // }
    request.delete('http://localhost:8088/api/v1/namespaces/default/pods/' + req.params.pod_name, { json: true }, function(error, response, body) {
        if (error) {
            res.send(error).status(500)
        } else {
            res.json(body)
        }
    })
})

router.get('/get-pods', function(req, res, next) {
    // const headers = {
    //   Authorization: 'Bearer ' + 'eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZWZhdWx0Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6ImRlZmF1bHQtdG9rZW4tcDl6NzIiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiZGVmYXVsdCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6IjY1MDllNDc2LWE3NmUtMTFlOS1hMDZmLTA2YTA2MjMzM2RkMiIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDpkZWZhdWx0OmRlZmF1bHQifQ.x186XcfBL4oka_L3npsMb1w0RVGdWV-Fq02nlY7j429VHXVdMX0Pbfmvd7_WDgDeJ2-dSxfqy67ChlEvlcPXqt5sijn2dD5-WCp44uuEv5d0P06CmYvm4yN3ICcyCNtbc6C02Q8MK3UvxDKF4KswHce0fEg3JDFhBwBsQgrtp6yU9xFqG0A02I7Sf5081YOJG6kg2kClLLSgQ2a9sQuKFkFlQWMOyJ7yAccOw4QoKX7DJBEP_aGe5nYoK375_0-8bGMwcczuT0GrdPcJaXQOyjtOpMuiCdElbHFWAx-_0uESEsGnC56SkYUg8wH9MrQpb7xnI7Ksz9xiVoDnD1nwOg'
    // }
    request.get('http://localhost:8088/api/v1/namespaces/default/pods/', { json: true }, function(error, response, body) {
        if (error) {
            res.send(error).status(500)
        } else {
            res.json(body)
        }
    })
})

router.get('/namespaces', async function(req, res, next) {
    try {
        const namespaces = await client.api.v1.namespaces('default').pods('carts-77988f85cc-wvpm4').get();
        res.json(namespaces)

    } catch (e) {
        console.log(e)
    }
})


router.post('/pod-bash', function(req, res, next) {
  const cmd = req.body.cmd;
  console.log('cmd is %s',util.inspect(req.body))
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      res.send(error).status(500)
    }else{
      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      res.json({})
    }

  });
})



module.exports = router;
