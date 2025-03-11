{{/*
Expand the name of the chart.
*/}}
{{- define "city-os-ui.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "city-os-ui.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}


{{/*
Create the full qualified url the app is reachable at
*/}}
{{- define "city-os-ui.fullUrl" -}}
{{- if .Values.ingress.enabled }}
{{- $protocol := "http" -}}
{{- if .Values.ingress.tls }}
{{- $protocol = "https" -}}
{{- end }}
{{- $prefix := printf "%s://" $protocol -}}
{{- $host := include "common.tplvalues.render" (dict "value" .Values.ingress.host "context" $) -}}
{{- $path := .Values.ingress.path -}}
{{- printf "%s%s%s" $prefix $host $path }}
{{- else }}
{{- printf "localhost:%v" .Values.service.port }}
{{- end }}
{{- end }}


{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "city-os-ui.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "city-os-ui.labels" -}}
helm.sh/chart: {{ include "city-os-ui.chart" . }}
{{ include "city-os-ui.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "city-os-ui.selectorLabels" -}}
app.kubernetes.io/name: {{ include "city-os-ui.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
